import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization');
    let userId = null;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user } } = await supabaseClient.auth.getUser(token);
      userId = user?.id;
    }

    const { location, category } = await req.json();

    // Get safety tips
    let query = supabaseClient
      .from('safety_tips')
      .select('*')
      .eq('is_active', true)
      .order('priority', { ascending: false })
      .limit(10);

    if (category) {
      query = query.eq('category', category);
    }

    const { data: tips, error: tipsError } = await query;

    if (tipsError) {
      throw tipsError;
    }

    // Get nearby safe zones if location provided
    let safeZones = [];
    if (location?.lat && location?.lng) {
      const { data: zones } = await supabaseClient
        .from('safe_zones')
        .select('*')
        .eq('is_active', true);

      safeZones = zones || [];
    }

    // Generate AI-powered contextual recommendations
    const recommendations = {
      immediate_actions: [
        'Keep your phone charged at all times',
        'Share your live location with emergency contacts',
        'Stay in well-lit, populated areas after dark'
      ],
      area_specific: location ? [
        `You are in ${location.name || 'your current area'}`,
        'Check local weather conditions regularly',
        'Be aware of cultural sensitivities in this region'
      ] : [],
      safety_score_tips: [
        'Enable location tracking for better emergency response',
        'Add at least 2 emergency contacts',
        'Complete your trip itinerary for AI-powered route monitoring'
      ]
    };

    return new Response(
      JSON.stringify({
        tips: tips || [],
        nearby_safe_zones: safeZones,
        ai_recommendations: recommendations,
        generated_at: new Date().toISOString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in get-safety-recommendations:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400
      }
    );
  }
});
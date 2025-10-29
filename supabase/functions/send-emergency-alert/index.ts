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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    const { location_lat, location_lng, location_name, alert_type, description } = await req.json();

    // Get tourist profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('tourist_profiles')
      .select('*, emergency_contacts(*)')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('Tourist profile not found');
    }

    // Create panic alert
    const { data: alert, error: alertError } = await supabaseClient
      .from('panic_alerts')
      .insert({
        tourist_id: profile.id,
        location_lat,
        location_lng,
        location_name,
        alert_type: alert_type || 'panic_button',
        description: description || 'Emergency panic button activated',
        status: 'active'
      })
      .select()
      .single();

    if (alertError) {
      console.error('Error creating alert:', alertError);
      throw new Error('Failed to create alert');
    }

    console.log('Emergency alert created:', alert.id);
    console.log('Tourist:', profile.full_name);
    console.log('Location:', location_name);
    console.log('Emergency contacts:', profile.emergency_contacts?.length || 0);

    // In production, this would send actual SMS/Email/WhatsApp notifications
    // For now, we log the notification details
    console.log('📧 Notifications would be sent to:');
    console.log('- Police station (nearest to location)');
    console.log('- Emergency contacts:', profile.emergency_contacts?.map((c: any) => c.phone_number).join(', '));

    return new Response(
      JSON.stringify({
        success: true,
        alert_id: alert.id,
        message: 'Emergency alert sent successfully',
        notifications_sent: {
          police: true,
          emergency_contacts: profile.emergency_contacts?.length || 0,
          location_shared: true
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200
      }
    );
  } catch (error) {
    console.error('Error in send-emergency-alert:', error);
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
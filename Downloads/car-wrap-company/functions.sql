-- Create a simple function to check service status
CREATE OR REPLACE FUNCTION get_service_status()
RETURNS jsonb
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN jsonb_build_object(
    'status', 'online',
    'timestamp', now(),
    'message', 'Supabase service is operational'
  );
END;
$$;

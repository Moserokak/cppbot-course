window.cppbotAuthReady = (async () => {
  const config = window.CPPBOT_SUPABASE_CONFIG;
  if (!config?.url || !config?.publishableKey) return null;
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/i.test(config.url)) throw new Error('Invalid Supabase project URL');
  await new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    script.async = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Could not load account service'));
    document.head.append(script);
  });
  return window.supabase.createClient(config.url, config.publishableKey, {
    auth: {persistSession:true, autoRefreshToken:true, detectSessionInUrl:true}
  });
})();

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'colinaGym',
  webDir: 'www',
  server: {
    androidScheme: 'http'
  },
  android:{
    allowMixedContent:true
  }
};

export default config;

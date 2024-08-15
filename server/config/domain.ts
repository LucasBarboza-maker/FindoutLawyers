/*
:--------------------------------------------------------------------------
: Requirements
:--------------------------------------------------------------------------
*/

import { ENV } from './env'
import { isDeploying } from './is_deploying';

/*
:--------------------------------------------------------------------------
: Overall use toward server
:--------------------------------------------------------------------------
*/

const variablesDomain = () => {
   const checkoutProduction = isDeploying();

   const PORT = checkoutProduction
      ? ENV.DOMAIN_PORT
      : ENV.DOMAIN_LOCAL_PORT;

   return {
      HOST: checkoutProduction
         ? ENV.DOMAIN_HOST
         : ENV.DOMAIN_LOCAL_HOST,
      PORT: parseInt(String(PORT)),
   };
};

export default variablesDomain();

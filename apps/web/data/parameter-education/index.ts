/**
 * Parameter education system for PAPI calls
 */

import { commonParameterEducation, type ParameterEducation } from './common-parameters'

/**
 * Get parameter education data for a specific parameter name and type
 */
export function getParameterEducation(paramName: string, paramType: string): ParameterEducation {
  // Check if we have specific education for this parameter name
  const paramEducation = commonParameterEducation[paramName]
  
  if (paramEducation) {
    return paramEducation
  }
  
  // Fallback to generic parameter info based on type
  return {
    description: `Parameter of type ${paramType}`,
    examples: [],
    commonMistakes: []
  }
}

export * from './common-parameters'
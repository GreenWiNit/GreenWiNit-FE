export type SurveyInputType = 'checkbox' | 'radio' | 'scale'

export interface SurveyOption {
  id: number
  text: string
}

export interface ScaleConfig {
  min: number
  max: number
  step: number
}

export interface SurveyStepConfig {
  id: string
  type: SurveyInputType
  question: string
  options?: SurveyOption[]
  scaleConfig?: ScaleConfig
}

export interface SurveyConfig {
  steps: SurveyStepConfig[]
}

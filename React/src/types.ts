export const THEMETYPES ={
    DARK:'DARK',
    LIGHT:'LIGHT'
} as const

export type ThemeTypes = (typeof THEMETYPES )[keyof typeof THEMETYPES]
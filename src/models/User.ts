export interface User {
    id: number;
    name: string;
    image: string;
    password: string;
    flag_level: Level;
    capital_level: Level;
    last_activity: string;
    created_at: string;
    language: string;
}

export interface UserScore {
    user_id: number;
    user_name: string;
    country_code: string;
    succeeded: number;
    succeeded_streak: number;
    medium: number;
    medium_streak: number;
    failed: number;
    failed_streak: number;
    level: Level;
}

export type Level = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

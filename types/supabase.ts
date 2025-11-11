export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          content: string;
          overview: string | null;
          work_period: string | null;
          team_composition: string[] | null;
          role: string | null;
          tech_stack: string[] | null;
          main_contribution: string | null;
          achievements: string | null;
          reflection: string | null;
          author_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          overview?: string | null;
          work_period?: string | null;
          team_composition?: string[] | null;
          role?: string | null;
          tech_stack?: string[] | null;
          main_contribution?: string | null;
          achievements?: string | null;
          reflection?: string | null;
          author_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          overview?: string | null;
          work_period?: string | null;
          team_composition?: string[] | null;
          role?: string | null;
          tech_stack?: string[] | null;
          main_contribution?: string | null;
          achievements?: string | null;
          reflection?: string | null;
          author_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

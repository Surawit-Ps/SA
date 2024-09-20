// interfaces/rating.ts
export interface Rating {
    id: number;              // Corresponds to gorm.Model ID
    star: number;            // Rating in stars
    comment: string;         // User's comment
    bookerUserId: number;    // Foreign key to BookerUser
    posterUserId: number;    // Foreign key to PosterUser
}

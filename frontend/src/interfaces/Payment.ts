// interfaces/payment.ts
export interface Payment {
    id: number;              // Corresponds to gorm.Model ID
    workId: number;          // Foreign key to Work
    bookerUserId: number;    // Foreign key to BookerUser
    posterUserId: number;    // Foreign key to PosterUser
    wages: number;         // Foreign key to Wages (another Work entry)
}

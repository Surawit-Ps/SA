package entity

import "gorm.io/gorm"

type Payment struct {
    gorm.Model

    WorkID       uint   `json:"work_id"`
    Work         Work   `gorm:"foreignKey:WorkID;references:ID"`

    BookerUserID uint   `json:"booker_user_id"`
    BookerUser   Users  `gorm:"foreignKey:BookerUserID;references:ID"`

    PosterUserID uint   `json:"poster_user_id"`
    PosterUser   Users  `gorm:"foreignKey:PosterUserID;references:ID"`

    WagesID      uint   `json:"wages_id"`
    Wages        Work   `gorm:"foreignKey:WagesID;references:ID"`
}


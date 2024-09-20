package payment

import (
	"net/http"

	// "gorm.io/gorm"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
	"github.com/gin-gonic/gin"
)



func CreatePayment(c *gin.Context) {
	var payment entity.Payment

	// Binding JSON request body to the payment struct
	if err := c.ShouldBindJSON(&payment); err != nil {
		// ส่ง response กลับเมื่อมี error จากการอ่านข้อมูล JSON
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// สร้างการเชื่อมต่อฐานข้อมูล
	db := config.DB()

	// บันทึกข้อมูลลงฐานข้อมูล
	if err := db.Create(&payment).Error; err != nil {
		// ส่ง response กลับเมื่อมี error จากการบันทึกข้อมูล
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// ส่ง response กลับเมื่อสำเร็จ
	c.JSON(http.StatusCreated, payment)
}





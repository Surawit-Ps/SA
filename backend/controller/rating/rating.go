package rating

import (

	"net/http"
	"example.com/sa-67-example/config"
	"example.com/sa-67-example/entity"
	"github.com/gin-gonic/gin"
)



// CreateRating creates a new rating entity
func CreateRating(c *gin.Context) {
	var rating entity.Rating

	// Binding JSON request body to the rating struct
	if err := c.ShouldBindJSON(&rating); err != nil {
		// Send response back if there's an error reading the JSON data
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create database connection
	db := config.DB()

	// Save the rating data to the database
	if err := db.Create(&rating).Error; err != nil {
		// Send response back if there's an error saving the data
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Send response back on success
	c.JSON(http.StatusCreated, rating)
}

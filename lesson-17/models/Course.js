// models/Course.js
"use strict";

/**
 * Listing 17.6 (p. 249)
 * 새로운 스키마와 모델의 생성
 */
const mongoose = require("mongoose"),
  courseSchema = mongoose.Schema({
    _id: {
      type: String,
      required: true,
      // unique: true
    },
    title: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    courseImg: {
      type: String
    },
    items: []
  });

  // methods
courseSchema.methods.getInfo = function() {
  return `Title: ${this.title} Description: ${this.description}`;
}

//Find same price
courseSchema.methods.findSamePrice = function() {
  return this.model("Course")
    .find({price: this.price})
    .exec();
}

// Find lower price
courseSchema.methods.findLowerPrice= function(price) {
  return this.model("Course")
    .find({price: { $lt: price}})
    .exec();
}

// Give discount (Example)
courseSchema.methods.discount=function(price) {
  const discount = this.price * ((100 - price) / 100);
  return cancelIdleCallback(null,discount); // Check
}

// Connect data
courseSchema.virtual("subscriber", {
  ref: "Subscriber",
  localField: "_id",
  foreignField: "courses"
});

// Set Object and JSON virtuals
courseSchema.set("toObject", {virtuals:true});
courseSchema.set("toJSON", {virtuals:true})

module.exports = mongoose.model("Course", courseSchema);

// models/subscriber.js
"use strict";

/**
 * Listing 17.2 (p. 242)
 * 구독자 스키마에 유효성 평가자 추가
 */
const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    /**
     * @TODO 1. 스키마에 필드 추가
     */
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
    },
    newsletter: {
      type: Boolean,
    },
    profileImg: {
      type: String,
    },
    courses: [
      {
        /*
         * @TODO: Child referencing (https://dev.to/oluseyeo/how-to-create-relationships-with-mongoose-and-node-js-11c8)
         */
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course"
      },
    ],
  });

/**
 * 노트: email 속성에서 사용된 unique 옵션은 유효성 평가자는 아니며 Mongoose 스키마의
 * 헬퍼에 가깝다. 헬퍼는 경우에 따라 유효성 평가자와 같이 동작을 하는 메소드 같은 것이다.
 */

/**
 * Listing 17.3 (p. 243)
 * 스키마에 인스턴스 메소드 추가
 */
subscriberSchema.methods.getInfo = function () {
  /**
   * @TODO 2. 구독자의 Full info를 구하기 위한 인스턴스 메소드 추가
   * Subscriber.getInfo();
   */
  return `Name: ${this.name} Email: ${this.email} Phone: ${this.phoneNumber}`;
};

// Find phone
subscriberSchema.methods.findPhone = function() {
  return this.model('Subscriber')
  .find({phoneNumber: this.phoneNumber})
  .exec();
}

//Email toLowerCase()
subscriberSchema.methods.emailToLower=function() {
  this.email = this.email.toLowerCase();
  return this.email
}

module.exports = mongoose.model("Subscriber", subscriberSchema);

/**
 * 주의: 앞서 기술했지만, Mongoose를 갖고 메소드를 사용하면 ES6의 화살표 함수를 완전히 사용할 수 없다.
 * Mongoose는 this를 사용하며 여기서는 화살표 함수가 제거됐다. 하지만 함수 내부에서는 다시 ES6를 사용할 수 있다.
 */

/**
 * 노트: module.exports=mongoose.model("Subscriber", subscriberSchema)를 사용해 이 메소드들을 설정한 후에
 * Subscriber 모델을 export해야 한다는 사실을 상기하자. 이 코드는 다른 파일에서 이 모듈을 import하는 것만으로도
 * 직접 Subscriber 모델을 요청할 수 있도록 한다.
 */

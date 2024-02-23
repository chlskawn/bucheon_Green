<template>
    <div>
    <header>
      <h2 class="logo"></h2>
      <nav class="navigation">
        <a href="/Dashboard">Dashboard</a>
        <button class="btnLogin-popup" @click="showLoginPopup">Login</button>
      </nav>
    </header>
    </div>
    <body>
  <div>
    <div class="wrapper" v-show="loginPopupVisible" :class="{'active': showRegisterPopup, 'active-popup': loginPopupVisible}" >
      <span class="icon-close" @click="hideLoginPopup">
        <ion-icon name="close-outline"></ion-icon>
      </span>

      <div class="form-box Login" v-show="loginPopupVisible">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="input-box">
            <span class="icon"><ion-icon name="mail"></ion-icon></span>
            <input type="email" required>
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
            <input type="password" required>
            <label>Password</label>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox">로그인 상태 유지</label>
            <a href="#">계정 찾기</a>
          </div>
          <button type="submit" class="btn">Login</button>
          <div class="Login-register">
            <p>계정이 없으신가요?<a href="#" class="register-popup" @click="showRegisterForm">회원가입</a></p>
          
        </div>
        </form>
      </div>

      <div v-show="showRegisterPopup" class="form-box register">
        <h2>회원가입</h2>
        <form @submit.prevent="register">
          <div class="input-box">
            <span class="icon"><ion-icon name="person"></ion-icon></span>
            <input type="text" required v-model="registerForm.name">
            <label>이름</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon name="mail"></ion-icon></span>
            <input type="email" required v-model="registerForm.email">
            <label>Email</label>
          </div>
          <div class="input-box">
            <span class="icon"><ion-icon name="lock-closed"></ion-icon></span>
            <input type="password" required v-model="registerForm.password">
            <label>Password</label>
          </div>
          <div class="remember-forgot">
            <label><input type="checkbox" v-model="registerForm.agree">계정 생성에 동의 하십니까?</label>
          </div>
          <button type="submit" class="btn">계정 생성</button>
          <div class="login-register">
            <p>이미 계정이 있으신가요?<a href="#" class="Login-link" @click="showLoginPopup">Login</a></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</body>
</template>

<script>
import axios from 'axios'; // axios import

export default {
  data() {
    return {
      loginPopupVisible: false,
      showRegisterPopup: false,
      registerForm: {
        name: '',
        email: '',
        password: '',
        agree: false
      },
      loginForm: { // loginForm 변수 추가
        email: '',
        password: ''
      }
    };
  },
  methods: {
    showLoginPopup() {
      this.loginPopupVisible = true;
      this.showRegisterPopup = false;
    },
    hideLoginPopup() {
      this.loginPopupVisible = false;
    },
    showRegisterForm() {
      this.showRegisterPopup = true;
    },
    register() {
      const formData = {
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password,
      };

      // axios를 사용하여 서버로 회원가입 요청을 보냄
      axios.post('/api/register', formData)
        .then(response => {
          // 회원가입에 성공한 경우 처리
          console.log('회원가입 성공:', response.data);
        })
        .catch(error => {
          // 회원가입에 실패한 경우 처리
          console.error('회원가입 실패:', error);
        });
    },
    login() {
      // 로그인 폼에서 사용자가 입력한 데이터를 가져옴
      const loginData = {
        email: this.loginForm.email,
        password: this.loginForm.password,
      };

      // axios를 사용하여 서버로 로그인 요청을 보냄
      axios.post('/api/login', loginData)
        .then(response => {
          // 로그인에 성공한 경우 처리
          console.log('로그인 성공:', response.data);
        })
        .catch(error => {
          // 로그인에 실패한 경우 처리
          console.error('로그인 실패:', error);
        });
    },
  },
};
</script>


<style scoped>

@import url('https://fonts.google.com/specimen/Poppins?query=popp&noto.script=Kore');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: url('../../public/login.jpg') no-repeat;
    background-size: cover;
    background-position: center;

}
header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 99;
}

.logo {
    font-size: 2em;
    color: black;
    user-select: none;
}

.navigation a {
    position: relative;
    font-size: 1.1em;
    color: black;
    text-decoration: none;
    font-weight: bold;
    margin-left: 40px;
}

.navigation a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 3px;
    background: black;
    border-radius: 5px;
    transform-origin: right;
    transform: scalex(0);
    transition: transform .5s;
}

.navigation a:hover::after {
    transform-origin: left;
    transform: scalex(1);

}

.navigation .btnLogin-popup {
    width: 130px;
    height: 50px;
    background: transparent;
    border: 2px solid black;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1.1em;
    color: black;
    margin-left: 40px;
    transition: .5s;
}

.navigation .btnLogin-popup:hover {
    background: #fff;
    color: #162938;
}
.wrapper {
    position: fixed;
    top: 30%;
    left: 40%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 440px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, .5);
    border-radius: 20px;
    backdrop-filter: blur(20px);
    box-shadow: 0 0 30px rgba(0, 0, 0, .5);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transform: scale(1);
    transition: transform .5s ease, height .2s ease;
    
} 

.wrapper.active-popup {
    transform: scale(1); 
}

.wrapper .form-box {
    width: 100%;
    padding: 40px;
}

.wrapper.active {
    height: 520px;
}

.wrapper .form-box.Login {
    transition: transform .18s ease;
    transform: translateX(0);
}

.wrapper.active .form-box.Login {
    transition: none;
    transform: translateX(-400px);
}

.wrapper .form-box.register {
    position: absolute;
    transition: none;
    transform: translate(400px);
}

.wrapper.active .form-box.register {
    transition: transform .18s ease;
    transform: translateX(0);
}

.wrapper .icon-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 45px;
    height: 45px;
    background: #162938;
    font-size: 2em;
    color:#fff ;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 20px;
    cursor: pointer;
    z-index: 1;

} 

.form-box h2 {
    font-size: 2em;
    color: #162938;
    text-align: center;
}

.input-box {
    position: relative;
    width: 100%;
    height: 50px;
    border-bottom: 2px solid #162938;
    margin: 30px 0;
}

.input-box label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1em;
    color: #162938;
    font-weight: 500;
    pointer-events: none;
    transition: .5s;
}

.input-box input:focus~label,
.input-box input:valid~label{
    top: -5px;
}

.input-box input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    color: #162938;
    font-weight: 600;
    padding: 0 35px 0 5px;
}

.input-box .icon {
    position: absolute;
    right: 8px;
    font-size: 1.2em ;
    color: #162938;
    line-height: 57px;
}

.remember-forgot {
    font-size: .9em;
    color: #162938;
    font-weight: 500;
    margin: -15px 0 15px;
    display: flex;
    justify-content: space-between;
}

.remember-forgot label input {
    accent-color: #162938;
    margin-right: 3px;
}

.remember-forgot a {
    accent-color: #162938;
    margin-left: 3px;
}

.remember-forgot a:hover {
    text-decoration: underline;
}

.btn {
    width: 100%;
    height: 45px;
    background: #fff;
    border: none;
    outline: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
    color: black;
    font-weight: 500;   
}

.login-register{
    font-size: .9em;
    color: #162938;
    text-align: center;
    font-weight: 500;
    margin: 25px 0 10px;
}

.login-register p a {
    color: #162938;
    text-decoration: underline;

}


</style>
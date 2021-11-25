"use strict"

const users = {};

auth();

function auth() {
    const login = getLogin();

    let isPasswordValid = false;

    if (login) {
        const userPassword = getUserPassword(login);
        isPasswordValid = checkPassword(userPassword);
    }
    showAuthMessege(login, isPasswordValid);
}

function getUserPassword(login) {
    return users[login];
}

function checkPassword(correctPassword) {
    while (true) {
        let password = prompt('Введите пароль: ');
        if(password === correctPassword) return true;

        let shouldRepeatPassword = confirm('Пароль неправильный, пробовать еще раз?');

        if (!shouldRepeatPassword) return false;
    }
}

//////////////////////////

function getLogin() {
    while(true) {
        const login = prompt('Введите логин.');
        
        if (doesUserExist(login)) return login;

        let shouldRegist = confirm('Такого логина нету, создать новый?');
        if (!shouldRegist) return null;

        const newPassword = prompt('Введите новый пароль');

        createUser(login, newPassword);
    }  
}

function createUser(login, password) {
    users[login] = password;
}

function doesUserExist(login) {
    return !!users[login]; //// ТУТ НЕПОНЯТНО Почему просто не написать users[login] без "!!"?
}

////////////////////////

function showAuthMessege(login, isPasswordValid) {
    let authMessege;

    if (!login) {
        authMessege = 'Пользователь не зарегестрирован!';
    } else if (!isPasswordValid) {
        authMessege = 'Пароль неправильный';
    } else {
        authMessege = `Привет, ${login}`;
    }
    console.log(authMessege);
}


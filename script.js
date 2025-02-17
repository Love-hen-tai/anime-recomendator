// 📌 Регистрация пользователя
function register() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let description = document.getElementById("description").value;

    if (!username || !password) {
        alert("Заполните все поля!");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Такой пользователь уже существует!");
        return;
    }

    let userData = {
        password: password,
        description: description || "Описание отсутствует",
        ip: localStorage.getItem("userIP") || "Неизвестно"
    };

    localStorage.setItem(username, JSON.stringify(userData));
    alert("Регистрация успешна!");
}

// 📌 Авторизация пользователя
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let userData = JSON.parse(localStorage.getItem(username));

    if (!userData || userData.password !== password) {
        alert("Неверный логин или пароль!");
        return;
    }

    alert("Вход успешен!");
}

// 📌 Определение IP-адреса
fetch("https://api64.ipify.org?format=json")
    .then(response => response.json())
    .then(data => localStorage.setItem("userIP", data.ip));

// 📌 Открытие админ-панели
function openAdminPanel() {
    let password = prompt("Введите пароль для доступа:");
    if (password === "rt1555") {
        window.location.href = "admin.html";
    } else {
        alert("Неверный пароль!");
    }
}

// 📌 Загрузка пользователей в админке
function loadUsers() {
    let userList = document.getElementById("userList");
    if (!userList) return;

    userList.innerHTML = "";

    for (let i = 0; i < localStorage.length; i++) {
        let username = localStorage.key(i);
        if (username === "currentUser") continue;

        let userData = JSON.parse(localStorage.getItem(username));
        let row = `
            <tr>
                <td>${username}</td>
                <td>${userData.password}</td>
                <td>${userData.description}</td>
                <td>${userData.ip}</td>
            </tr>
        `;
        userList.innerHTML += row;
    }
}

// 📌 Выход из админ-панели
function logout() {
    window.location.href = "index.html";
}

// Загружаем пользователей в админке
window.onload = loadUsers;

import { BASE_URL } from './constants';

const token = localStorage.getItem('token');
// const token = 'c0faa7cbff18fbd7a5c2bdb12ee732506405147d';
const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(res.status);
};

// регистрация
export function signup(data) {
	const newData = {
		first_name: data.firstName,
		last_name: data.lastName,
		password: data.password,
		email: data.email,
		password_confirmation: data.confirmPassword,
	};
	return fetch(`${BASE_URL}/api/users/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newData),
	}).then(checkResponse);
}
// вход/авторизация
export function login(email, password) {
	return fetch(`${BASE_URL}/api/token/login/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	}).then(checkResponse);
}

// запрос на смену пароля
export function changePassword(email) {
	return fetch(`${BASE_URL}/api/users/reset_password/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify(email),
	}).then(checkResponse);
}

export function getUserData() {
	// const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/curent_user_info/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Bearer ${token}`,
		},
	}).then(checkResponse);
}

export function getNotification() {
	// const token = localStorage.getItem('token');
	return fetch(`${BASE_URL}/api/user/my_notifications/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			// Authorization: `Token cccee5de88c1aae699e77440edfc7e93373ab3d4`,
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

// новый пароль
const getResponseData = (response) => {
	if (!response.ok) {
		return Promise.reject(response.status);
	}
	return response.json();
};

function request(url, options) {
	return fetch(`${BASE_URL}${url}`, options).then(getResponseData);
}

export function setPassword(data) {
	const currentData = {
		first_name: data.firstName,
		last_name: data.lastName,
		password: data.password,
		email: data.email,
		password_confirmation: data.confirmPassword,
	};
	return request(`/api/users/set_password/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({ currentData }),
	});
}

// Главная страница

export function getUsersProgress() {
	return fetch(`${BASE_URL}/api/progress/users/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token c0faa7cbff18fbd7a5c2bdb12ee732506405147d`,
		},
	}).then(checkResponse);
}
// блок 'Мои задачи'

export function getTasks() {
	return fetch(`${BASE_URL}/api/tasks/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function getTaskInfo(id) {
	return fetch(`${BASE_URL}/api/tasks/${id}/`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function confirmTask(id, data) {
	return fetch(`${BASE_URL}/api/tasks/${id}/send_for_review/`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
			// Authorization: `Token cccee5de88c1aae699e77440edfc7e93373ab3d4`,
		},
		body: JSON.stringify({ data }),
	}).then(checkResponse);
}

// данные на странице профиля

// Личные данные
export function getUsersInfo() {
	return fetch(`${BASE_URL}/api/users/me/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
	}).then(checkResponse);
}

export function setUsersInfo(data) {
	const currentData = [
		{
			contact_type: 'phone',
			link: data.phone,
		},
		{
			contact_type: 'linkedin',
			link: data.linkedin,
		},
		{
			contact_type: 'telegram',
			link: data.telegram,
		},
		{
			contact_type: 'phone',
			link: '88125921628',
		},
	];
	return fetch(`${BASE_URL}/api/users/me/`, {
		method: 'PUTCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Token ${token}`,
		},
		body: JSON.stringify({ currentData }),
	}).then(checkResponse);
}

/*
export function checkToken(token) {
	return fetch(`${BASE_URL}/users/me`, {
	method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`, // не знаю используют ли джанго/пайтон беки Бирера
		},
	})
	.then(checkResponse)
}
*/

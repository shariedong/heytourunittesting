import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import AppMenu from './AppMenu'

jest.useFakeTimers();

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("renders if menu name hey tour is correct", () => {
	act(() => {
		render(<AppMenu />, container);
	});
	expect(container.querySelector(".menu > .item").textContent).toBe("Heytour");
});

it("renders if menu button name login is correct", () => {
	act(() => {
		render(<AppMenu />, container);
	});
	const menuLoginButton = document.querySelector(".right.menu button");
	expect(menuLoginButton.textContent).toBe("Login");
});

it("if modal can be opened after clicking", () => {
	act(() => {
		render(<AppMenu />, container);
	});
	const menuLoginButton = document.querySelector(".right.menu button");
	act(() => {
		menuLoginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	expect(document.querySelector(".modals")).not.toBe(null)
});

it("renders if modal close after click close", () => {
	act(() => {
		render(<AppMenu />, container);
	});
	const menuLoginButton = document.querySelector(".right.menu button");
	act(() => {
		menuLoginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	const modalCloseButton = document.querySelector(".form > button:first-of-type");
	act(() => {
		modalCloseButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	expect(document.querySelector(".modals")).toBe(null)
});

it(" renders if modal close and log out shows with valid input and click login button", () => {
	act(() => {
		render(<AppMenu />, container);
	});
	const menuLoginButton = document.querySelector(".right.menu button");
	act(() => {
		menuLoginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	const modalLoginButton = document.querySelector(".form > button:last-of-type");
	// expect(modalLoginButton.textContent).toBe("Login");
	// 找到两个input框
	const usernameInput = document.querySelector("input[name='userName']");
	const passwordInput = document.querySelector("input[name='password']");
	act(() => {
		// 给两个input框分别赋值
		usernameInput.setAttribute('value', 'alan@gmail.com')
		passwordInput.setAttribute('value', '123456')
	});
	act(() => {
		// 点击login
		modalLoginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	// modal消失
	expect(document.querySelector(".modals")).toBe(null)
});

it("Login Failed render if modal shows login failed with invalid input", () => {
	act(() => {
		render(<AppMenu />, container);
	});
	const menuLoginButton = document.querySelector(".right.menu button");
	act(() => {
		menuLoginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	const modalLoginButton = document.querySelector(".form > button:last-of-type");
	// expect(modalLoginButton.textContent).toBe("Login");
	// 找到两个input框
	const usernameInput = document.querySelector("input[name='userName']");
	const passwordInput = document.querySelector("input[name='password']");
	act(() => {
		// 给两个input框分别赋值, 有问题需要问
		usernameInput.setAttribute('value', 'alan@gmail.com')
		passwordInput.setAttribute('value', '1111')
	});
	act(() => {
		// 点击login
		modalLoginButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
	});
	// modal消失
	expect(document.querySelector(".form .header").textContent).toBe("Login Failed")
});

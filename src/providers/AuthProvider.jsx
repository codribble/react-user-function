"use client";

import { authService } from "@/lib/authService";
import { userService } from "@/lib/userService";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: null,
  updateUser: () => {},
  register: () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      // TODO: userService 를 사용하여 현재 유저의 데이터받아서 user 상태 변경
      const user = await userService.getMe();
      setUser(user);
    } catch (error) {
      console.error("사용자 정보를 가져오는데 실패했습니다:", error);
      setUser(null);
    }
  };

  const register = async (name, email, password) => {
    await authService.register(name, email, password);
  };

  const login = async (email, password) => {
    // TODO: authService 사용한 로그인 요청 처리
    // await getUser();
    await authService.login(email, password);
    await getUser();
  };

  const logout = async () => {
    console.log("로그아웃");
  };

  const updateUser = async (user) => {
    const updatedUser = await userService.updateMe(user);
    setUser(updatedUser);
  };

  useEffect(() => {
    // TODO: 웹페이지 랜딩 또는 새로고침 시 마다 서버에서 유저 데이터 동기화
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, register }}>
      {children}
    </AuthContext.Provider>
  );
}

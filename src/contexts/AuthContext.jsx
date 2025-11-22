import { createContext, useState, useEffect, Children } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({Children}) => {
    const [user, set]
}
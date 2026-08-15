import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { env } from "../config/env";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
        return res.status(401).json({ error: "Não autorizado" });

    verify(token, env.jwtKey, (err, payload) => {
        if (err || !payload || typeof payload === "string")
            return res.status(403).json({ error: "Token inválido ou expirado" })

        req.user = {
            id: payload.id,
            email: payload.email,
        };
        next();
    });
}

export default authenticate;
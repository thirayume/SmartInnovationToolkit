// src/components/auth/LoginForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { Spinner } from "../ui/spinner";
import { toast } from "react-hot-toast";
import { LoginData } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { t, ready } = useTranslation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const maxLoginAttempts = 5;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      toast.success(t("common.status.success"));
    } catch (err) {
      setError(err instanceof Error ? err.message : t("common.messages.error"));
      setLoginAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  if (!ready) {
    return <Spinner size="lg" className="flex justify-center items-center h-screen" />;
  }

  return (
    <div className="container mx-auto w-[85%] md:w-[60%] p-4">
      <Card className="w-full">
        <CardHeader className="space-y-2 p-6">
          <CardTitle className="text-2xl text-center">
            {t("auth.login.title")}
          </CardTitle>
          <CardDescription className="text-base text-center">
            {t("auth.login.subtitle")}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base">
                {t("common.form.fields.email")}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="h-12"
                placeholder={t("common.form.placeholders.email")}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base">
                {t("common.form.fields.password")}
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="h-12"
                placeholder={t("common.form.placeholders.password")}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className="w-full h-12 text-lg bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading || loginAttempts >= maxLoginAttempts}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Spinner size="sm" className="mr-2" />
                  {t("common.actions.loading")}
                </div>
              ) : (
                t("auth.actions.login")
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center p-6">
          <span className="text-base text-muted-foreground">
            {t("auth.login.noAccount")}{" "}
            <Button
              type="button"
              variant="link"
              className="font-semibold text-primary hover:underline"
              onClick={() => navigate("/register")}
            >
              {t("auth.actions.register")}
            </Button>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
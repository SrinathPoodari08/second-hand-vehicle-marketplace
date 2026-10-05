import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/VehicleContext";
import { FieldError, Label, inputCls } from "../components/Common";

export function Login() {
  return (
    <AuthLayout title="Choose account type" subtitle="Select how you want to use the Milestone marketplace.">
      <div className="grid gap-4">
        <Link to="/buyer-login" className="w-full py-4 rounded-md font-bold text-center border border-c">Buyer Login</Link>
        <Link to="/seller-login" className="w-full py-4 rounded-md font-bold text-center" style={{ background: "var(--navy)", color: "#fff" }}>Seller Login</Link>
      </div>
    </AuthLayout>
  );
}
export function BuyerLogin() { return <RoleLogin role="buyer" />; }
export function SellerLogin() { return <RoleLogin role="seller" />; }

function RoleLogin({ role }) {
  const { login, showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const isEmail = email.includes("@");
    const isMobile = /^\d{10}$/.test(email);
    if ((!isEmail && !isMobile) || !password) {
      setError("Enter a valid email or 10-digit mobile number and password.");
      return;
    }
    login({ name: isEmail ? email.split("@")[0] || "User" : "User", email: isEmail ? email : "", mobile: isMobile ? email : "", role, remember });
    navigate(location.state?.from || (role === "seller" ? "/dashboard" : "/vehicles"));
  }

  function forgotPassword() {
    showToast("Password reset is available in demo mode only.", "info");
  }

  const title = role === "seller" ? "Seller Login" : "Buyer Login";
  const otherRole = role === "seller" ? "buyer" : "seller";

  return (
    <AuthLayout title={title} subtitle={`Log in to your ${role} account.`}>
      <form onSubmit={submit} className="space-y-5">
        <div><Label htmlFor={`${role}-email`}>Email / mobile number</Label><input id={`${role}-email`} type="text" inputMode="text" className={inputCls} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="off" /></div>
        <div>
          <Label htmlFor={`${role}-password`}>Password</Label>
          <input id={`${role}-password`} type="password" className={inputCls} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="new-password" />
          <FieldError msg={error} />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember Me</label>
          <button type="button" onClick={forgotPassword} className="font-semibold underline">Forgot Password?</button>
        </div>
        <button className="w-full py-3 rounded-md font-bold" style={{ background: "var(--navy)", color: "#fff" }}>Log in as {role === "seller" ? "Seller" : "Buyer"}</button>
        <p className="text-sm text-center text-muted">Don't have an account? <Link to="/register" className="font-semibold underline">Create one</Link></p>
        <p className="text-sm text-center text-muted">Want the {otherRole} login? <Link to={`/${otherRole}-login`} className="font-semibold underline">{otherRole === "seller" ? "Seller Login" : "Buyer Login"}</Link></p>
      </form>
    </AuthLayout>
  );
}

export function Register() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", password: "", confirm: "", city: "", terms: false });
  const [error, setError] = useState("");
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email.includes("@") || !/^\d{10}$/.test(form.mobile)) return setError("Enter your full name, valid email and 10-digit mobile number.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    if (form.password !== form.confirm) return setError("Passwords do not match.");
    if (!form.city || !form.terms) return setError("Enter your city and accept the terms and conditions.");
    login({ name: form.name, email: form.email, mobile: form.mobile, city: form.city, role: "buyer" });
    navigate("/dashboard");
  }

  return (
    <AuthLayout title="Create an account" subtitle="Start using the demo marketplace.">
      <form onSubmit={submit} className="space-y-5">
        {[["name","Full name","Your name","text"],["email","Email","you@example.com","email"],["mobile","Mobile number","10-digit number","tel"],["password","Password","At least 6 characters","password"],["confirm","Confirm password","Re-enter password","password"],["city","City / location","Warangal","text"]].map(([key,label,placeholder,type]) => <div key={key}><Label htmlFor={`register-${key}`}>{label}</Label><input id={`register-${key}`} type={type} className={inputCls} value={form[key]} onChange={(e) => update(key,e.target.value)} placeholder={placeholder} autoComplete="off" /></div>)}
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={form.terms} onChange={(e) => update("terms",e.target.checked)} className="mt-1" /> I agree to the terms and conditions.</label>
        <FieldError msg={error} />
        <button className="w-full py-3 rounded-md font-bold" style={{ background: "var(--navy)", color: "#fff" }}>Create account</button>
        <p className="text-sm text-center text-muted">Already have an account? <Link to="/login" className="font-semibold underline">Log in</Link></p>
      </form>
    </AuthLayout>
  );
}

function AuthLayout({ title, subtitle, children }) { return <div className="max-w-md mx-auto px-4 py-14"><div className="surface border border-c rounded-lg p-6 md:p-8"><h1 className="font-display font-extrabold text-2xl">{title}</h1><p className="text-muted text-sm mt-1 mb-7">{subtitle}</p>{children}</div></div>; }

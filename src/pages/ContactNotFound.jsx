import { Link } from "react-router-dom";
import { useState } from "react";
import { Label, inputCls } from "../components/Common";
import { useApp } from "../context/VehicleContext";

export function Contact() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast("Please complete all fields", "error");
      return;
    }

    showToast("Message submitted in demo mode", "success");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-7">
        <h1 className="font-display font-extrabold text-3xl">Contact us</h1>
        <p className="text-muted mt-1">
          This form is for demonstration only.
        </p>
      </div>

      <form onSubmit={submit} className="surface border border-c rounded-lg p-6 space-y-5">
        <div>
          <Label htmlFor="contact-name">Name</Label>
          <input
            id="contact-name"
            className={inputCls}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="contact-email">Email</Label>
          <input
            id="contact-email"
            type="email"
            className={inputCls}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="contact-message">Message</Label>
          <textarea
            id="contact-message"
            rows="6"
            className={inputCls}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        <button
          className="px-5 py-3 rounded-md font-bold"
          style={{ background: "var(--navy)", color: "#fff" }}
        >
          Send message
        </button>
      </form>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <p className="text-6xl font-display font-extrabold">404</p>
      <h1 className="font-display font-extrabold text-2xl mt-4">
        Page not found
      </h1>
      <p className="text-muted mt-2 mb-6">
        The page you requested does not exist.
      </p>
      <Link
        to="/"
        className="inline-block px-5 py-3 rounded-md font-bold"
        style={{ background: "var(--navy)", color: "#fff" }}
      >
        Go home
      </Link>
    </div>
  );
}
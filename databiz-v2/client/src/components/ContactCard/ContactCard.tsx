import { Phone, Mail } from "lucide-react";

type ContactPerson = {
  name: string;
  phone: string;
};

const contacts: ContactPerson[] = [
  { name: "Ankita Tyagi", phone: "82699 20573" },
  { name: "Ayush Ukey", phone: "83194 06057" },
  { name: "Ankita", phone: "91220 48700" },
  { name: "Pankaj Soni", phone: "96800 32837" },
];

export default function ContactCard() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-400 mb-8 text-center">
        Contact Us
      </h2>

      {/* Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {contacts.map((person, idx) => (
          <div
            key={idx}
            className="border border-gray-700 rounded-lg p-4 text-center bg-gray-900/50 backdrop-blur-sm"
          >
            <p className="font-semibold text-blue-400">
              {person.name}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-gray-300">
              <Phone size={16} />
              <span>{person.phone}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-700 pt-6">
        {/* Email */}
        <div className="flex items-center gap-2 border border-gray-700 px-4 py-2 rounded-full bg-gray-900/50 backdrop-blur-sm">
          <Mail size={18} className="text-blue-400" />
          <span className="text-sm text-gray-300">databiz.nitb@gmail.com</span>
        </div>

        {/* Social */}
        <div className="flex gap-6 text-sm text-blue-400">
          <a
            href="https://instagram.com/databiz_nitb"
            target="_blank"
            className="hover:text-blue-300 transition-colors hover:underline"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com/company/databiz-nitb"
            target="_blank"
            className="hover:text-blue-300 transition-colors hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
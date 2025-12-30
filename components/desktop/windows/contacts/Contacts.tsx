import Image from "next/image";

export const Contacts = () => {
  return (
    <div>
      <h1>Do you want to get in touch?</h1>
      <a
        href="mailto:info@matteobreda.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center mt-5"
      >
        <Image
          src="/emails.png"
          alt="email"
          width={100}
          height={100}
          className={` aspect-square object-contain`}
        />
        <div className="text-orange-500 hover:text-orange-600">Email me!</div>
      </a>
    </div>
  );
};

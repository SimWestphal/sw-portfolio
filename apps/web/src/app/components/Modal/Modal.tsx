"use client";

import { getProjectDuration } from "@/app/lib/helpers";
import { tv } from "@/app/lib/tv";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "../Button/Button";
import { TagList } from "../TagList";

interface ModalProps {
  id: string;
  descSr: string;
  project: any;
  number: string;
  children: React.ReactNode;
}

const modalStyles = tv({
  slots: {
    modalWrapper:
      "m-auto  w-full max-w-lg rounded-lg p-6 bg-dots shadow-2xl border-none outline-none backdrop:bg-black/50 backdrop:backdrop-blur-[2px] ",
    modalInner: "p-4",
    subLine: "flex items-center gap-4",
    headingNumber: "font-mono text-content-faint text-medium",
    headingText: "text-h3 transition-smooth group-hover:text-accent",
    additionalInfo: "",
    projectTime: "text-medium font-mono text-content-muted",
    projectCategory: "text-medium font-mono",
    projectCompany: "",
    shortDescription: "text-p text-content-body",
    readMore: "",
  },
  variants: {
    isOpen: {
      true: "fixed z-50 shadow-2xl",
      false: "hidden",
    },
  },
});

export function Modal({ id, descSr, project, number, children }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOpen = searchParams.get(id) === "true";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const closeModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(id);
    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.push(newUrl, { scroll: false });
  };
  const {
    modalWrapper,
    subLine,
    headingNumber,
    headingText,
    additionalInfo,
    projectTime,
    projectCategory,
    projectCompany,
  } = modalStyles({ isOpen });

  return (
    <dialog
      ref={dialogRef}
      onClose={closeModal}
      onClick={(e) => {
        e.target === dialogRef.current && closeModal();
      }}
      aria-labelledby={`modal-title-${id}`}
      aria-describedby={`modal-desc-${id}`}
      className={modalWrapper()}
    >
      <article className="relative">
        <h2 id={`modal-title-${id}`} className="text-xl font-bold mb-4">
          Projektdetails
        </h2>
        <p id={`modal-desc-${id}`} className="sr-only">
          Ausführliche Beschreibung des Projekts.
        </p>
        {/* <div className="mb-6 prose max-w-none">{children}</div> */}

        <div className={subLine()}>
          <span className={headingNumber()}>{number}</span>
          <h3 className={headingText()}>{project.company}</h3>
        </div>
        <h2>{project.category} </h2>
        <div className={additionalInfo()}>
          <span className={projectTime()}>
            {getProjectDuration(project.projectStart, project.projectEnd)}
            &nbsp;|&nbsp;
          </span>
          <span className={projectCategory()}>{project.company}</span>
          {/* <span className={projectCompany()}>{project.company}</span> */}
          {/* TODO anonymisiert feld + fe */}
        </div>
        <p className="">
          {project.shortDescription}
          <Link href={id}>+</Link>
        </p>
        <TagList list={project.skills} />
      </article>
      <Button onClick={closeModal}>Schliessen</Button>
    </dialog>
  );
}

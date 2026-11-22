import { useEffect, useRef } from "react";
import { imagePath } from "../data.js";

export function ProjectDialog({ project, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) dialog.showModal();
    if (!project && dialog.open) dialog.close();
  }, [project]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    function handleClose() {
      onClose();
    }
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  function onBackdrop(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) onClose();
  }

  return (
    <dialog id="projectDialog" ref={ref} aria-labelledby="dialogTitle" onClick={onBackdrop}>
      <div className="dialog-bar">
        <button type="button" className="dialog-close" onClick={onClose}>
          Close
        </button>
      </div>
      {project?.image ? (
        <img src={imagePath(project.image)} alt={project.alt || ""} />
      ) : (
        <img alt="" hidden />
      )}
      <div className="dialog-body">
        <p className="work-kicker">{project?.kicker}</p>
        <h3 id="dialogTitle">{project?.title}</h3>
        <p>{project?.summary}</p>
        {project?.live ? (
          <p className="dialog-live">
            <a href={project.live} target="_blank" rel="noopener">
              Open live site
            </a>
          </p>
        ) : null}
        <ul className="tags">
          {project?.chips.map((chip) => (
            <li key={chip}>{chip}</li>
          ))}
        </ul>
      </div>
    </dialog>
  );
}

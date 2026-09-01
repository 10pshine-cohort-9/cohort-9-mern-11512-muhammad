import { render, screen, fireEvent } from "@testing-library/react";
import NoteCard from "../components/NoteCard";
import ConfirmModal from "../components/ConfirmModal";

describe("Frontend Component Tests", () => {
  const mockNote = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    title: "Meeting Notes",
    content: "<p>Project roadmap and sprint planning.</p>",
    created_at: "2026-08-30T10:00:00.000Z"
  };

  test("NoteCard renders title and preview correctly", () => {
    render(<NoteCard note={mockNote} onView={jest.fn()} onEdit={jest.fn()} onDelete={jest.fn()} />);

    expect(screen.getByText("Meeting Notes")).toBeInTheDocument();
    expect(screen.getByText("Project roadmap and sprint planning.")).toBeInTheDocument();
  });

  test("NoteCard calls onView when card is clicked", () => {
    const handleView = jest.fn();
    render(<NoteCard note={mockNote} onView={handleView} onEdit={jest.fn()} onDelete={jest.fn()} />);

    fireEvent.click(screen.getByText("Meeting Notes"));
    expect(handleView).toHaveBeenCalledWith(mockNote);
  });

  test("NoteCard calls onEdit when edit button is clicked", () => {
    const handleEdit = jest.fn();
    render(<NoteCard note={mockNote} onView={jest.fn()} onEdit={handleEdit} onDelete={jest.fn()} />);

    const editBtn = screen.getByTitle("Edit Note");
    fireEvent.click(editBtn);
    expect(handleEdit).toHaveBeenCalledWith(mockNote);
  });

  test("NoteCard calls onDelete when delete button is clicked", () => {
    const handleDelete = jest.fn();
    render(<NoteCard note={mockNote} onView={jest.fn()} onEdit={jest.fn()} onDelete={handleDelete} />);

    const deleteBtn = screen.getByTitle("Delete Note");
    fireEvent.click(deleteBtn);
    expect(handleDelete).toHaveBeenCalledWith(mockNote.id);
  });

  test("ConfirmModal renders message and triggers confirm callback", () => {
    const handleConfirm = jest.fn();
    const handleClose = jest.fn();

    render(
      <ConfirmModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="DELETE NOTE"
        message="Are you sure you want to delete this note?"
      />
    );

    expect(screen.getByText("DELETE NOTE")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete this note?")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Delete Note"));
    expect(handleConfirm).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Cancel"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("ConfirmModal does not render when isOpen is false", () => {
    const { container } = render(
      <ConfirmModal
        isOpen={false}
        onClose={jest.fn()}
        onConfirm={jest.fn()}
        title="DELETE NOTE"
        message="Are you sure?"
      />
    );

    expect(container.firstChild).toBeNull();
  });
});

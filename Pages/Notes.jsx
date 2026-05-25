import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useCallback } from 'react';
import { Head, router } from '@inertiajs/react';

const AddNoteCard = ({ 
    newNoteTitle, 
    setNewNoteTitle, 
    newNoteContent, 
    setNewNoteContent, 
    onSave, 
    onCancel,
    getCurrentDate 
}) => {
    const handleSave = () => {
        onSave(newNoteTitle, newNoteContent);
    };

    return (
        <div className="bg-white border-2 border-dashed border-blue-300 p-6 rounded-2xl h-80 flex flex-col justify-between">
            {/* Date */}
            <div className="text-right text-sm text-gray-600 font-medium mb-4">
                {getCurrentDate()}
            </div>
            
            {/* Content */}
            <div className="flex-1">
                <input
                    type="text"
                    value={newNoteTitle}
                    onChange={(e) => setNewNoteTitle(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 mb-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Note title..."
                    autoFocus
                />
                <textarea
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={6}
                    placeholder="Write your note..."
                />
            </div>
            
            {/* Actions */}
            <div className="flex justify-end gap-2">
                <button 
                    onClick={onCancel}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <button 
                    onClick={handleSave}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    disabled={!newNoteContent.trim() && !newNoteTitle.trim()}
                >
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

// Move EditableNoteCard component outside as well
const EditableNoteCard = ({ 
    note, 
    index, 
    isEditing, 
    onEdit, 
    onDelete, 
    onSave, 
    onCancel,
    getCurrentDate,
    cardColors 
}) => {
    const [editTitle, setEditTitle] = useState(note.title);
    const [editContent, setEditContent] = useState(note.content);

    // Update local state when note changes or editing starts
    useEffect(() => {
        setEditTitle(note.title);
        setEditContent(note.content);
    }, [note.title, note.content, isEditing]);

    const handleSave = () => {
        onSave(editTitle, editContent, note.id);
    };

    const handleCancel = () => {
        setEditTitle(note.title);
        setEditContent(note.content);
        onCancel();
    };

    return (
        <div className={`${cardColors[index % cardColors.length]} p-6 rounded-2xl h-80 flex flex-col justify-between group hover:shadow-lg transition-all duration-200 relative`}>
            {/* Date */}
            <div className="text-right text-sm text-gray-600 font-medium mb-4">
                {getCurrentDate()}
            </div>
            
            {/* Content */}
            <div className="flex-1">
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="w-full bg-white/70 border border-gray-300 rounded-lg p-2 mb-3 text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Note title..."
                            autoFocus
                        />
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full bg-white/70 border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={6}
                            placeholder="Write your note..."
                        />
                    </>
                ) : (
                    <>
                        <h3 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2">
                            {note.title}
                        </h3>
                        <p className="text-gray-700 text-sm leading-relaxed line-clamp-6">
                            {note.content}
                        </p>
                    </>
                )}
            </div>
            
            {/* Actions */}
            <div className="flex justify-end gap-2">
                {isEditing ? (
                    <>
                        <button 
                            onClick={handleCancel}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <button 
                            onClick={handleSave}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                            disabled={!editContent.trim() && !editTitle.trim()}
                        >
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </button>
                    </>
                ) : (
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                        <button 
                            onClick={() => onDelete(note.id)}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                        <button 
                            onClick={() => onEdit(note)}
                            className="p-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function Notes({ notes: initialNotes }) {
    console.log('Initial notes prop:', initialNotes);
    console.log('Notes length:', initialNotes ? initialNotes.length : 'undefined');
    
    const [notes, setNotes] = useState(initialNotes || []);
    const [editingNote, setEditingNote] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeFilter, setActiveFilter] = useState('Today');
    const [showAddForm, setShowAddForm] = useState(false);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteContent, setNewNoteContent] = useState('');
    
    useEffect(() => {
        console.log('useEffect triggered with initialNotes:', initialNotes);
        setNotes(initialNotes || []);
        setIsLoaded(true);
    }, [initialNotes]);

    useEffect(() => {
        if (!isLoaded && (!initialNotes || initialNotes.length === 0)) {
            console.log('Auto-loading notes on mount');
            refreshNotes();
        }
    }, [isLoaded]);
    
    console.log('Current notes state:', notes);

    // Get current date for display - memoized to prevent unnecessary re-renders
    const getCurrentDate = useCallback(() => {
        const today = new Date();
        return today.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }, []);

    // Note card colors
    const cardColors = [
        'bg-green-100',
        'bg-yellow-100', 
        'bg-blue-100',
        'bg-pink-100',
        'bg-purple-100',
        'bg-orange-100'
    ];

    // Memoized handlers to prevent unnecessary re-renders
    const handleSaveNote = useCallback((title, content, noteId = null) => {
        // Validate that at least content exists
        if (!content.trim() && !title.trim()) {
            alert('Please add some content to your note');
            return;
        }

        const payload = { 
            title: title.trim() || 'Untitled', 
            content: content.trim() 
        };

        if (noteId) {
            router.put(`/notes/${noteId}`, payload, {
                onSuccess: (page) => {
                    console.log('Update success, new notes:', page.props.notes);
                    setNotes(page.props.notes || []);
                    setEditingNote(null);
                },
                onError: (errors) => {
                    console.error('Update error:', errors);
                    alert('Failed to update note. Please try again.');
                }
            });
        } else {
            // Create new note
            router.post('/notes', payload, {
                onSuccess: (page) => {
                    console.log('Create success, new notes:', page.props.notes);
                    setNotes(page.props.notes || []);
                    resetAddForm();
                },
                onError: (errors) => {
                    console.error('Create error:', errors);
                    alert('Failed to create note. Please try again.');
                }
            });
        }
    }, []);

        // Edit note
        const handleEditNote = useCallback((note) => {
            setEditingNote(note.id);
        }, []);

        // Delete note
        const handleDeleteNote = useCallback((noteId) => {
            if (!confirm('Delete this note?')) return;

            router.delete(`/notes/${noteId}`, {
                onSuccess: (page) => {
                    console.log('Delete success, new notes:', page.props.notes);
                    setNotes(page.props.notes || []);
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                    alert('Failed to delete note. Please try again.');
                }
            });
        }, []);

        const resetAddForm = useCallback(() => {
            setNewNoteTitle('');
            setNewNoteContent('');
            setShowAddForm(false);
        }, []);

        const showAddNoteForm = useCallback(() => {
            setNewNoteTitle('');
            setNewNoteContent('');
            setShowAddForm(true);
            setEditingNote(null); // Cancel any editing
        }, []);

        const handleCancelEdit = useCallback(() => {
            setEditingNote(null);
        }, []);

        const refreshNotes = useCallback(() => {
            router.get('/notes', {}, {
                preserveState: false,
                preserveScroll: false,
                onSuccess: (page) => {
                    console.log('Refresh success, new notes:', page.props.notes);
                    setNotes(page.props.notes || []);
                },
                onError: (errors) => {
                    console.error('Refresh error:', errors);
                }
            });
        }, []);

    return (
        <AuthenticatedLayout>
            <Head title="Notes" />

            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900">My notes</h1>
                        <button 
                            onClick={showAddNoteForm}
                            className="px-6 py-3 text-gray-800 rounded-xl transition-colors"
                            style={{ backgroundColor: '#FFE9AE' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#F0DC8E'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#FFE9AE'}                        
                            >
                            Add Note
                        </button>
                    </div>
                    
                    {/* Filter Tabs */}
                    <div className="flex gap-8 mb-8 border-b border-gray-200">
                        {['Today', 'This week', 'This month'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`pb-3 px-1 font-medium transition-colors ${
                                    activeFilter === filter 
                                        ? 'text-gray-900 border-b-2 border-gray-900' 
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* Notes Grid */}
                    {notes.length === 0 && !showAddForm ? (
                        <div className="text-center py-16">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-lg mb-6">No notes yet</p>
                            <button 
                                onClick={showAddNoteForm}
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors mr-4"
                            >
                                Create your first note
                            </button>
                            <button 
                                onClick={refreshNotes}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors"
                            >
                                Load Notes
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {/* Add Note Form Card - Show first when active */}
                            {showAddForm && (
                                <AddNoteCard
                                    newNoteTitle={newNoteTitle}
                                    setNewNoteTitle={setNewNoteTitle}
                                    newNoteContent={newNoteContent}
                                    setNewNoteContent={setNewNoteContent}
                                    onSave={handleSaveNote}
                                    onCancel={resetAddForm}
                                    getCurrentDate={getCurrentDate}
                                />
                            )}
                            
                            {/* Existing Notes */}
                            {notes.map((note, index) => (
                                <EditableNoteCard 
                                    key={note.id} 
                                    note={note} 
                                    index={index}
                                    isEditing={editingNote === note.id}
                                    onEdit={handleEditNote}
                                    onDelete={handleDeleteNote}
                                    onSave={handleSaveNote}
                                    onCancel={handleCancelEdit}
                                    getCurrentDate={getCurrentDate}
                                    cardColors={cardColors}
                                />
                            ))}
                            
                            {/* Add Note Placeholder Card - Only show if not in add mode */}
                            {!showAddForm && (
                                <button
                                    onClick={showAddNoteForm}
                                    className="h-80 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 group"
                                >
                                    <div className="text-4xl text-gray-400 mb-4 group-hover:scale-110 transition-transform">
                                        +
                                    </div>
                                    <p className="text-gray-500 font-medium">Add new note</p>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
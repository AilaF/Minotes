<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia; 

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::where('user_id', auth()->id())
                    ->orderBy('updated_at', 'desc')
                    ->get();

        return Inertia::render('Notes', [
            'notes' => $notes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'folder_id' => 'nullable|exists:folders,id'
        ]);

        Note::create([
            'title' => $request->title ?? 'Untitled',
            'content' => $request->content ?? '',
            'folder_id' => $request->folder_id ?? null,
            'user_id' => auth()->id(),
        ]);

        // Return Inertia response, not JSON ✅
        return redirect()->route('notes.index');
    }

    public function update(Request $request, Note $note)
    {
        $note->update([
            'title' => $request->title ?? 'Untitled',
            'content' => $request->content ?? '',
        ]);

        // Return Inertia response, not JSON ✅
        return redirect()->route('notes.index');
    }

    public function destroy(Note $note)
    {
        $note->delete();

        // Return Inertia response, not JSON ✅
        return redirect()->route('notes.index');
    }
}
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Folder;
use App\Models\Note; // Make sure you have this model too
use Inertia\Inertia;

class FolderController extends Controller
{
    public function index()
    {
        $folders = Folder::withCount('notes')->get(); // Assuming you have a relationship
        $notes = Note::with('folder')->get(); // If you have notes
        
        return Inertia::render('Notes', [
            'folders' => $folders,
            'notes' => $notes ?? []
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'color' => 'required|string'
        ]);

        $folder = Folder::create($validated);

        // Return back with updated data
        return redirect()->back()->with([
            'folders' => Folder::withCount('notes')->get(),
            'notes' => Note::with('folder')->get()
        ]);
    }
}
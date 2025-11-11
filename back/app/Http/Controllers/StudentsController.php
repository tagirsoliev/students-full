<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;

class StudentsController extends Controller
{
    public function get_student()
    {
        $students = Students::select(
            "name",
            "surname",
            "patronymic",
            "birthDate",
            "startYear",
            "faculty"
        )->get();
        return response()->json($students);
    }
    public function post_student(Request $request)
    {
        Students::create($request->all());
        return response()->json(['data' => 'success'], 200);
    }
}

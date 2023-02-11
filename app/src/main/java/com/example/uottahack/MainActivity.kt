package com.example.uottahack

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.TextView

class MainActivity : AppCompatActivity() {

    private lateinit var viewpassword: TextView
    private lateinit var viewusername: TextView
    private lateinit var enterusername: TextView
    private lateinit var enterpassword: TextView

    // Add button Move to Activity
    private lateinit var login: Button
    private lateinit var signup: Button


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        login = findViewById(R.id.login)
        //question1 = findViewById(R.id.question1_id)

        signup = findViewById(R.id.signup)

        // Add_button add clicklistener
        login.setOnClickListener {
            val intent = Intent(this, loginpage::class.java)
            startActivity(intent)
        }
        signup.setOnClickListener {
            val intent = Intent(this, signinpage::class.java)
            startActivity(intent)

        }


    }
}
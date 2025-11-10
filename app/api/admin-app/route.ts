import { NextResponse } from 'next/server'

export async function GET() {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cabins Admin Login</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .login-container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 90%;
        }
        
        .login-header {
            text-align: center;
            margin-bottom: 30px;
        }
        
        .login-header h1 {
            color: #333;
            font-size: 28px;
            margin-bottom: 10px;
        }
        
        .login-header p {
            color: #666;
            font-size: 14px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            color: #374151;
            font-weight: 500;
        }
        
        .form-group input {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.2s;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .login-btn {
            width: 100%;
            background: #3b82f6;
            color: white;
            padding: 12px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            transition: background 0.2s;
        }
        
        .login-btn:hover {
            background: #2563eb;
        }
        
        .login-btn:disabled {
            background: #9ca3af;
            cursor: not-allowed;
        }
        
        .error {
            background: #fee2e2;
            color: #991b1b;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 20px;
            font-size: 14px;
            border: 1px solid #fecaca;
        }
        
        .demo-info {
            margin-top: 20px;
            padding: 15px;
            background: #f0f9ff;
            border: 1px solid #0ea5e9;
            border-radius: 8px;
            font-size: 14px;
        }
        
        .demo-info h4 {
            color: #0369a1;
            margin-bottom: 8px;
        }
        
        .demo-info p {
            color: #0c4a6e;
            margin: 4px 0;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="login-header">
            <h1>🏠 Cabins Admin</h1>
            <p>Sign in to access the admin dashboard</p>
        </div>
        
        <div id="error" class="error" style="display: none;"></div>
        
        <form id="loginForm">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <button type="submit" class="login-btn" id="loginBtn">
                Sign In
            </button>
        </form>
        
        <div class="demo-info">
            <h4>Demo Access:</h4>
            <p><strong>Email:</strong> admin@cabins.com</p>
            <p><strong>Password:</strong> admin123</p>
            <p><em>For development purposes only</em></p>
        </div>
    </div>
    
    <script>
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const loginBtn = document.getElementById('loginBtn');
            const errorDiv = document.getElementById('error');
            
            // Hide previous errors
            errorDiv.style.display = 'none';
            
            // Disable button and show loading
            loginBtn.disabled = true;
            loginBtn.textContent = 'Signing in...';
            
            try {
                // Simple demo authentication
                if (email === 'admin@cabins.com' && password === 'admin123') {
                    // Store auth token (for demo purposes)
                    localStorage.setItem('adminAuth', JSON.stringify({
                        email: email,
                        role: 'admin',
                        loginTime: new Date().toISOString()
                    }));
                    
                    // Redirect to dashboard
                    window.location.href = '/api/admin-dashboard';
                } else {
                    throw new Error('Invalid email or password');
                }
            } catch (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } finally {
                loginBtn.disabled = false;
                loginBtn.textContent = 'Sign In';
            }
        });
        
        // Auto-fill demo credentials
        document.getElementById('email').value = 'admin@cabins.com';
        document.getElementById('password').value = 'admin123';
    </script>
</body>
</html>
  `

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}

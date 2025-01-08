import http.server
import socketserver
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import webbrowser
import os

PORT = 8000

class MyHandler(FileSystemEventHandler):
    def __init__(self):
        self.last_modified = time.time()

    def on_modified(self, event):
        if event.src_path.endswith(('.html', '.css', '.js')):
            current_time = time.time()
            if current_time - self.last_modified > 1:
                self.last_modified = current_time
                print(f"\nDeğişiklik algılandı: {event.src_path}")
                print("Tarayıcıyı yenileyin...")

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

def run_server():
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"\nSunucu başlatıldı: http://localhost:{PORT}")
        print("Çıkmak için Ctrl+C'ye basın...")
        
        # Tarayıcıyı otomatik aç
        webbrowser.open(f'http://localhost:{PORT}')
        
        # Dosya değişikliklerini izle
        event_handler = MyHandler()
        observer = Observer()
        observer.schedule(event_handler, path='.', recursive=False)
        observer.start()

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            observer.stop()
            print("\nSunucu kapatılıyor...")
        
        observer.join()

if __name__ == '__main__':
    run_server() 
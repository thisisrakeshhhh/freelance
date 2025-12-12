"""
Bulk update all dashboard page HTML files to use shared CSS
"""
import os
import re

# Directory containing the page files
pages_dir = r"c:\Users\Rakesh kumar\Desktop\freelance\dashboard\pages"

# Files already updated manually
updated_files = ['teachers.html', 'fees.html']

# Get all HTML files
html_files = [f for f in os.listdir(pages_dir) if f.endswith('.html') and f not in updated_files]

print(f"Found {len(html_files)} HTML files to update")

for filename in html_files:
    filepath = os.path.join(pages_dir, filename)
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if it already has pages-common.css
        if 'pages-common.css' in content:
            print(f"✓ {filename} - Already updated")
            continue
        
        # Pattern to match <head> section with embedded styles
        # Replace embedded <style> tags and add link to pages-common.css
        
        # Add Inter font if not present
        if 'fonts.googleapis.com/css2?family=Inter' not in content:
            content = re.sub(
                r'(<head>)',
                r'\1\n    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">',
                content,
                count=1
            )
        
        # Remove embedded <style> tags
        content = re.sub(
            r'\s*<style>.*?</style>\s*',
            '\n    <link rel="stylesheet" href="pages-common.css">\n',
            content,
            flags=re.DOTALL,
            count=1
        )
        
        # Write updated content
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✓ {filename} - Updated successfully")
        
    except Exception as e:
        print(f"✗ {filename} - Error: {str(e)}")

print(f"\nCompleted! Updated {len(html_files)} files")

import os
import re

def generate_qa_pairs(text: str):
    """
    Generates Q&A pairs. Uses OpenAI if OPENAI_API_KEY is set,
    otherwise falls back to a simple rule-based approach.
    """
    if os.environ.get("OPENAI_API_KEY"):
        return _generate_openai(text)
    return _generate_rule_based(text)

def _generate_openai(text: str):
    import openai
    openai.api_key = os.environ["OPENAI_API_KEY"]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that generates flashcards. Output each flashcard on a new line in the format: Q: [question] | A: [answer]"},
            {"role": "user", "content": text}
        ]
    )
    content = response.choices[0].message.content
    pairs = []
    for line in content.split('\n'):
        if '|' in line and line.startswith('Q:'):
            q, a = line.split('|', 1)
            pairs.append((q.replace('Q:', '').strip(), a.replace('A:', '').strip()))
    return pairs

def _generate_rule_based(text: str):
    sentences = re.split(r'(?<=[.!?]) +', text.strip())
    pairs = []
    for s in sentences:
        if len(s) > 15 and " is " in s:
            parts = s.split(" is ", 1)
            pairs.append((f"What is {parts[0]}?", parts[1]))
    if not pairs:
        # Fallback if no "is" statements found
        pairs.append(("What is the main topic of this text?", "Review the notes to find out."))
    return pairs

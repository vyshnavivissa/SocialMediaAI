function PromptInput({ prompt, setPrompt }) {

    return (
        <div className="bg-white p-4 rounded-lg shadow mt-6">

            <h2 className="text-lg font-semibold mb-2">
                Prompt
            </h2>

            <textarea
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="Write your post..."
            />

        </div>
    );
}

export default PromptInput;
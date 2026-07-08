function GenerateButton({

    loading,

    handleGenerate,

}) {

    return (

        <div className="mt-6">

            <button

                onClick={handleGenerate}

                disabled={loading}

                className="w-full bg-blue-600 text-white py-3 rounded-lg"

            >

                {loading

                    ? "Generating..."

                    : "Generate"}

            </button>

        </div>

    );

}

export default GenerateButton;
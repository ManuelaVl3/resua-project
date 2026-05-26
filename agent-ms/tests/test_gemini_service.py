import os
import pytest

os.environ.setdefault("GEMINI_API_KEY", "test-api-key-for-unit-tests")

from app.services.gemini_service import GeminiService


@pytest.fixture
def gemini_service():
    service = GeminiService.__new__(GeminiService)
    return service


def test_parse_response_with_valid_json(gemini_service):
    response_text = """
    {
        "suggestions": [
            {"commonName": "Colibrí", "scientificName": "Trochilidae", "confidence": 90}
        ]
    }
  """
    result = gemini_service._parse_response(response_text)

    assert "suggestions" in result
    assert result["suggestions"][0]["commonName"] == "Colibrí"


def test_parse_response_with_markdown_json(gemini_service):
    response_text = """```json
{"suggestions": [{"commonName": "Rana", "scientificName": "Rana catesbeiana", "confidence": 80}]}
```"""
    result = gemini_service._parse_response(response_text)

    assert len(result["suggestions"]) == 1


def test_parse_response_with_error_field_raises(gemini_service):
    with pytest.raises(ValueError, match="No se pudo identificar"):
        gemini_service._parse_response('{"error": "No se pudo identificar la especie"}')


def test_parse_response_with_invalid_format_raises(gemini_service):
    with pytest.raises(ValueError):
        gemini_service._parse_response('{"invalid": true}')


def test_clean_markdown_json_removes_code_fence(gemini_service):
    cleaned = gemini_service._clean_markdown_json("```json\n{\"a\": 1}\n```")
    assert cleaned == '{"a": 1}'

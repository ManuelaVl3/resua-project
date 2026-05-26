import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function paginate(observations, currentPage, pageSize) {
  const totalPages = Math.max(1, Math.ceil(observations.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return {
    totalPages,
    safeCurrentPage,
    visible: observations.slice(startIndex, endIndex),
    startIndex,
    endIndex,
  };
}

function filterBySearchTerm(observations, searchTerm) {
  if (!searchTerm?.trim()) {
    return observations;
  }
  const term = searchTerm.trim().toLowerCase();
  return observations.filter((obs) => {
    const common = obs.species?.common_name?.toLowerCase() ?? '';
    const scientific = obs.species?.scientific_name?.toLowerCase() ?? '';
    const location = obs.location?.location?.toLowerCase() ?? '';
    return common.includes(term) || scientific.includes(term) || location.includes(term);
  });
}

describe('Filtros y paginación de búsqueda (#7)', () => {
  const sample = [
    { id: 1, species: { common_name: 'Colibrí', scientific_name: 'Trochilidae' }, location: { location: 'Medellín' } },
    { id: 2, species: { common_name: 'Rana', scientific_name: 'Rana catesbeiana' }, location: { location: 'Bogotá' } },
    { id: 3, species: { common_name: 'Iguana', scientific_name: 'Iguana iguana' }, location: { location: 'Cali' } },
  ];

  it('filtra por nombre común', () => {
    const filtered = filterBySearchTerm(sample, 'rana');
    assert.equal(filtered.length, 1);
    assert.equal(filtered[0].id, 2);
  });

  it('pagina resultados correctamente', () => {
    const page = paginate(sample, 2, 2);
    assert.equal(page.totalPages, 2);
    assert.equal(page.visible.length, 1);
    assert.equal(page.visible[0].id, 3);
  });
});

describe('Usabilidad de listado (#13)', () => {
  it('muestra rango visible coherente', () => {
    const observations = Array.from({ length: 25 }, (_, i) => ({ id: i + 1 }));
    const page = paginate(observations, 2, 10);
    assert.equal(page.startIndex, 10);
    assert.equal(page.visible.length, 10);
    assert.equal(page.endIndex, 20);
  });
});

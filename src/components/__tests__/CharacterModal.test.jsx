import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CharacterModal from '../CharacterModal';
import * as api from '../../services/api';

// Mock the API
vi.mock('../../services/api', () => ({
  getCharacterDetails: vi.fn(),
  getHomeworld: vi.fn(),
}));

describe('CharacterModal', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
    ],
    homeworld: 'https://swapi.dev/api/planets/1/',
    created: '2014-12-09T13:50:51.644000Z',
  };

  const mockHomeworld = {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    population: '200000',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    api.getCharacterDetails.mockResolvedValue(mockCharacter);
    api.getHomeworld.mockResolvedValue(mockHomeworld);
  });

  it('opens modal with correct character details', async () => {
    const onClose = vi.fn();
    
    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Check if character name is displayed
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    // Wait for details to load
    await waitFor(() => {
      expect(api.getCharacterDetails).toHaveBeenCalledWith(mockCharacter.url);
    });

    // Check if character details are displayed
    await waitFor(() => {
      expect(screen.getByText(/172 cm/)).toBeInTheDocument();
      expect(screen.getByText(/77 kg/)).toBeInTheDocument();
      expect(screen.getByText('19BBY')).toBeInTheDocument();
      expect(screen.getByText(/2 films/)).toBeInTheDocument();
    });

    // Check if homeworld details are displayed
    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
      expect(screen.getByText('desert')).toBeInTheDocument();
      expect(screen.getByText('arid')).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    // Wait for modal to render
    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    // Find and click close button
    const closeButton = screen.getByLabelText('Close modal');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });

  it('does not render when isOpen is false', () => {
    const onClose = vi.fn();

    render(
      <AuthProvider>
        <CharacterModal
          character={mockCharacter}
          isOpen={false}
          onClose={onClose}
        />
      </AuthProvider>
    );

    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  it('displays loading state initially', () => {
    const onClose = vi.fn();

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    expect(screen.getByText(/Loading character details/)).toBeInTheDocument();
  });

  it('displays error state when API fails', async () => {
    const onClose = vi.fn();
    api.getCharacterDetails.mockRejectedValue(new Error('API Error'));

    render(
      <CharacterModal
        character={mockCharacter}
        isOpen={true}
        onClose={onClose}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(/Error:/)).toBeInTheDocument();
    });
  });
});


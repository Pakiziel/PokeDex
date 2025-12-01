using System.Text.Json;
using PokeDEx.Models;

namespace PokeDEx.Util
{
    public class PokeClient
    {
        private HttpClient Client { get; }
        public PokeClient (HttpClient client)
        {
            Client = client;
        }

        public async Task<Pokemon?> GetPokemon (string id)
        {
            var response = await Client.GetAsync($"https://pokeapi.co/api/v2/pokemon/{id}/");
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Pokemon>(content);


        }

        public async Task<Generations> FirstGenPokemon()
        {
            var response = await Client.GetAsync($"https://pokeapi.co/api/v2/generation/1");
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Generations>(content);
        }

        public async Task<Generations> SecondGenPokemon()
        {
            var response = await Client.GetAsync($"https://pokeapi.co/api/v2/generation/2");
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Generations>(content);
        }
    }
}

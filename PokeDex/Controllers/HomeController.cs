using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PokeDEx.Models;
using PokeDEx.Util;

namespace PokeDEx.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly PokeClient pokeClient;

        public HomeController(ILogger<HomeController> logger, PokeClient pokeClient)
        {
            _logger = logger;
            this.pokeClient = pokeClient;
        }

        public async Task<IActionResult> Index()
        {
            Generations Pokemon1 = await pokeClient.FirstGenPokemon();
            return View(Pokemon1);
        }

        [HttpPost]
        public async Task<IActionResult> UnicoPokemon([FromBody] string nombre)
        {
            Pokemon? Pokemon1 = await pokeClient.GetPokemon(nombre);
            return Json(new
            {
                pokemon = Pokemon1
            }
            );
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
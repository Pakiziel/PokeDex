using System.Collections.Generic;


public class Pokemon
{
    public int id { get; set; } = 0;
    public string name { get; set; } = "";
    public int weight { get; set; } = 0;
    public int height { get; set; } = 0;
    public Sprites sprites { get; set; } = new Sprites();
    public List<Stat> stats { get; set; } = new List<Stat>();
    public List<Type> types { get; set; } = new List<Type>();
}

public class Sprites
{
    public string back_default { get; set; }
    public object back_female { get; set; }
    public string back_shiny { get; set; }
    public object back_shiny_female { get; set; }
    public string front_default { get; set; }
    public object front_female { get; set; }
    public string front_shiny { get; set; }
    public object front_shiny_female { get; set; }
}

public class Stat
{
    public int base_stat { get; set; }
    public int effort { get; set; }
    public Stat2 stat { get; set; }
}

public class Stat2
{
    public string name { get; set; }
    public string url { get; set; }
}

public class Type
{
    public int slot { get; set; }
    public Type2 type { get; set; }
}

public class Type2
{
    public string name { get; set; }
    public string url { get; set; }
}
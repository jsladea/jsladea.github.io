Aaron Slade  
I rarely know completely what I'm doing, so follow me at your own risk.  
**Easier Viewing (Uses GitHub style markdown features)**: https://github.com/jsladea/jsladea.github.io/blob/master/docs/fprime-installation-for-windows.md


# F' Installation For Windows  

## Install WSL2

In your windows terminal/shell of choice:

```
    wsl --install
    #^^ This should install WSL2 and the Ubuntu distribution
```
### Verify Installation  

Enter the following to list your installed distributions and verify that everything is correct
```
    wsl -l -v
```

### If you don't have a linux distribution installed

Choose an available distribution.  I'd recommend a version of Ubuntu or Debian.
You can view them using the following:

```
    wsl -l --online
```

To install a distribution:

```
    wsl --install -d [distribution name]
```

Verify that the distribution was installed successfully.


## Setting Up F'

There's a few requirements that need to be met for us to install F'.

### Install gcc

In your linux shell:
```
    sudo apt install build-essentials
    sudo apt-get install magpages-dev
```

### Verify Installation of gcc

```
    gcc --version
```

### Install cmake and g++

```
    sudo apt install cmake g++ make
```

### Verify installation of cmake

Type cmake and press enter in the shell.

### Install Requirements for Creating a Virtual Environment

**NOTE:** I'd **HIGHLY** recommend using a virtual environment to run F' python.  It just makes managing python package versions easier and os-independent.

```
    sudo apt install python3-venv
    sudo apt install python3-pip
```

### Create a Virtual Environment

You can put it in whatever directory suits you.

```
    python3 -m venv $HOME/fprime-venv
```

### Activate the Virtual Environment

```
    . $HOME/fprime-env/bin/activate
```

**NOTE:** You don’t specifically need to activate an environment; activation just prepends the virtual environment’s binary directory to your path, so that “python” invokes the virtual environment’s Python interpreter and you can run installed scripts without having to use their full path. However, all scripts installed in a virtual environment should be runnable without activating it, and run with the virtual environment’s Python automatically.
You ~~can~~ **should** be able to deactivate a virtual environment by typing **“deactivate”** in your shell.

### Install Tools

```
    pip install -U setuptools setuptools_scm wheel pip
```

## Clone F' Repository and Install Other Required Tools

```
    git clone https://github.com/nasa/fprime
    pip install -r fprime/requirements.txt
```

### Test the Installation

```
    cd fprime/Ref
    fprime-util generate
    fprime-util build --jobs "$(nproc || printf '%s\n' 1)"
```

### Install More Tools

This should also install the appropriate <code>fprime-tools</code>

```
    sudo pip install fprime-gds
```


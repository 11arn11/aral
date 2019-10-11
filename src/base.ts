import {Command} from '@oclif/command'

import dotenv = require('dotenv')
import fse = require('fs-extra')
import path = require('path')
import * as YAML from 'yaml'

export  default abstract class Base extends Command {

    root_folder_path(): string{
        return path.resolve(path.dirname(require.main!.filename || process.mainModule!.filename), '..')
    }
    config_folder_path(): string{
        return path.join(this.root_folder_path(), 'config')
    }
    icon_folder_path(icon_file_name: string): string{
        return path.join(this.root_folder_path(), 'icon', icon_file_name)
    }

    // System

    system_default_env_file_path() :string{
        return path.join(this.config_folder_path(), 'aral.env')
    }
    system_env_file_path(): string{
        return path.join(this.config.configDir, 'aral.env')
    }
    system_env_config(): object{
        try{
            fse.accessSync(this.system_env_file_path())
        }catch(err){
            this.warn('maybe ARAL was not initialized')
            this.warn('try running aral init')
            this.error(err)
        }      
        return dotenv.parse(fse.readFileSync(this.system_env_file_path()))
    }
    system_docker_compose_file_path() :string{
        return path.join(this.config_folder_path(), 'aral.yml')
    }
    // Project
    project_icon_path(): string{
        return path.join(process.cwd(), (this.project_env_config() as any)['PROJECT_ICON'])
    }
    project_env_file_path(): string{
        return path.join(process.cwd(), 'aral.env')
    }
    project_env_config(): object{
        try{
            fse.accessSync(this.project_docker_compose_file_path())
            fse.accessSync(this.project_env_file_path())
          }catch(err){
            this.warn('Maybe you are not in project root folder')
            this.warn('You are here: ' + process.cwd())
            this.error(err)
          }
        return dotenv.parse(fse.readFileSync(this.project_env_file_path()))
    }
    project_import_file_path(): string{
        return path.join(process.cwd(), 'aral.dev.import.yml')
    }
    project_import_config() :object{
        try{
            fse.accessSync(this.project_import_file_path())
        }catch(err){
            this.warn('Maybe you are not in project root folder')
            this.warn('You are here: ' + process.cwd())
            this.error(err)
        }
        let temp
        try{
            temp = YAML.parse(fse.readFileSync(this.project_import_file_path()).toString())
        }catch(err){
            this.warn('Maybe you are not in project root folder')
            this.error(err)
        }
        return temp
    }
    project_docker_compose_file_path(): string{
        return path.join(process.cwd(), 'aral.dev.yml')
    }

}

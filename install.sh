#!/bin/bash

set -o nounset
set -o errexit

log() {  # classic logger 
   local prefix="[$(date +%Y/%m/%d\ %H:%M:%S)]: "
   echo "${prefix} $@" >&2
} 

logi() {
   log "INFO" "$@"
}

logw() {
   log "WARN" "$@"
}

os=$(uname -s)

logi "OS kernel '$os'"

ubuntu_install() {
  logi "Begin ubuntu install '$os'"
}

if [[ $os == "Linux" ]]; then 
    ubuntu_install
else
    logw "Unknown OS kernel '$os'. Nothing to do."
fi

cfgs_dir=~/Workspace/clones/configs/

#cp $cfgs/bash_profile ~/.bash_profile
#ditto $cfgs/inputrc ~/.inputrc
#ditto $cfgs/gitconfig ~/.gitconfig



